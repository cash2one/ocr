# -*- coding: utf-8 -*-
"""
response for sending email in html template
"""

import smtplib  
import threading
import bs4
import os
import sys
import subprocess
from email.mime.text import MIMEText  
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

from config import *

mail_sender = 'ai-news@baidu.com'
mail_user = 'ai-news'
mail_pass = 'Jf&kT2BEBq'
mail_host = 'email.baidu.com'
mail_use_TLS = True


def send(receiver, sub, content, img_list):
    # 邮件对象:
    me = "hello" + "<" + mail_sender + ">"
    #msg = MIMEText(content, _subtype='html', _charset='utf-8')
    msg = MIMEMultipart()
    msg['Subject'] = sub
    msg['From'] = me  
    msg['To'] = receiver

    # 邮件正文是MIMEText:
    msg.attach(MIMEText(content, 'html', 'utf-8'))

    # 添加附件就是加上一个MIMEBase，从本地读取一个图片:
    for img in img_list:
        with open(img, 'rb') as f:
            file_name = os.path.basename(img)
            file_ext = os.path.splitext(img)[1][1:]
            # 设置附件的MIME和文件名，这里是png类型:
            mime = MIMEBase(
                'image', file_ext, filename=file_name
            )
            # 加上必要的头信息:
            mime.add_header('Content-Disposition', 'attachment', filename=file_name)
            mime.add_header('Content-ID', '<%s>' % file_name)
            mime.add_header('X-Attachment-Id', file_name)
            # 把附件的内容读进来:
            mime.set_payload(f.read())
            # 用Base64编码:
            encoders.encode_base64(mime)
            # 添加到MIMEMultipart:
            msg.attach(mime)
    try:  
        s = smtplib.SMTP()  
        s.connect(mail_host)
        if mail_use_TLS:
            s.starttls()
        s.login(mail_user, mail_pass)
        #print msg.as_string()
        s.sendmail(me, receiver, msg.as_string())
        s.close()
        return True
    except Exception as e:
        log.error(e)
        return False  

class SendThread(threading.Thread):
    def __init__(self, receiver, sub, content, img_list):
        super(SendThread, self).__init__()
        self.receiver = receiver
        self.sub = sub
        self.content = content
        self.img_list = img_list

    def run(self):
        send(self.receiver, self.sub, self.content, self.img_list)


def get_mail_content(html_file):
    html_doc = open(html_file).read()
    soup = bs4.BeautifulSoup(html_doc, 'html.parser')

    img_list = set()
    for img in soup.find_all('img'):
        try:
            if os.path.isfile(img['src']):
                img_list.add(img['src'])
                cmd = 'base64 %s' % img['src']
                p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
                img_base64 = p.stdout.read().replace('\n', '')

                #print img_base64.replace('\n', '')
                #img_src = 'data:image/%s;base64,%s' % (os.path.splitext(img['src'])[1][1:], img_base64)
                img_src = 'cid:%s' % os.path.basename(img['src'])

                img['src'] = img_src

        except Exception as e:
            log.error(e)

    #去除邮件头
    i = 0
    for p in soup.find_all('p'):
        if i >= 5: break
        p.extract()
        i += 1

    #去除注释
    comments = soup.findAll(text=lambda text:isinstance(text, bs4.Comment))
    [comment.extract() for comment in comments]

    return soup.prettify(), img_list


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        log.error('please input html content file!')
        exit(0)

    html_file = sys.argv[1]
    content, img_list = get_mail_content(html_file)
    #print content.encode('utf8')
    
    #send('xuyifei@baidu.com', 'test', content, img_list)
    #st = SendThread('xuyifei@baidu.com', 'test', content, img_list)
    st = SendThread('shiliang@baidu.com', 'test', content, img_list)
    st.start()
