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
import xlrd
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
    """
    send mail
    :param receiver:
    :param sub:
    :param content:
    :param img_list:
    :return:
    """
    # 邮件对象:
    me = "hello" + "<" + mail_sender + ">"
    # msg = MIMEText(content, _subtype='html', _charset='utf-8')
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
        # print msg.as_string()
        s.sendmail(me, receiver, msg.as_string())
        s.close()

        log.info('%s sended!' % email)
        return True
    except Exception as e:
        log.error(e)
        return False  


class SendThread(threading.Thread):
    """send thread"""
    def __init__(self, receiver, sub, content, img_list):
        """
        init
        :param receiver:
        :param sub:
        :param content:
        :param img_list:
        """
        super(SendThread, self).__init__()
        self.receiver = receiver
        self.sub = sub
        self.content = content
        self.img_list = img_list

    def run(self):
        """
        run
        :return:
        """
        send(self.receiver, self.sub, self.content, self.img_list)


def get_mail_content(html_data):
    """
    get mail content
    :param html_data:
    :return:
    """
    html_doc = html_data
    soup = bs4.BeautifulSoup(html_doc, 'html.parser')

    img_list = set()
    for img in soup.find_all('img'):
        try:
            if os.path.isfile(img['src']):
                img_list.add(img['src'])
                # cmd = 'base64 %s' % img['src']
                # p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
                # img_base64 = p.stdout.read().replace('\n', '')

                # print img_base64.replace('\n', '')
                # img_src = 'data:image/%s;base64,%s' % \
                # (os.path.splitext(img['src'])[1][1:], img_base64)
                img_src = 'cid:%s' % os.path.basename(img['src'])

                img['src'] = img_src

        except Exception as e:
            log.error(e)

    # 去除邮件头
    i = 0
    for p in soup.find_all('p'):
        if i >= 5:
            break
        p.extract()
        i += 1

    # 去除注释
    comments = soup.findAll(text=lambda text: isinstance(text, bs4.Comment))
    [comment.extract() for comment in comments]

    return soup.prettify(), img_list


def get_subscribe_user(email='all'):
    """
    get_subscribe_user
    :param email:
    :return:
    """
    if email == 'all':
        sql = "select * from t_subscribe where subscribe_tag = 'all'"
    else:
        sql = "select * from t_subscribe " \
              "where subscribe_tag = 'all' and email = '%s'" % email

    all_subscribe_user = exec_sql(sql)

    all_email = {}
    for u in all_subscribe_user:
        id = u[0]
        sex = u[2]
        email = u[3]
        token = md5('%s%s%s' % (email, sex, id))

        if email not in all_email:
            all_email[email] = {}

        all_email[email]['token'] = token

        # print email, token

    return all_email


def gen_mail_content(xls_prefix, email, token):
    """
    gen_mail_content
    :param xls_prefix:
    :param email:
    :param token:
    :return:
    """
    unsubscribe_link = "http://ai.baidu.com/index/subscribe?action=chooseReason&email=%s&token=%s" \
                       % (email, token)

    header = """
<div align="center">
<table style=" width: 800px; background-color:#fff;font-family:'Microsoft Yahei';" border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="background-color: #14191d;height: 30px;font-size:12px;">
        <td style="padding:15px 30px;width:25%%;">
            <a href="http://developer.baidu.com/?edm201701l" target="_blank">
                <img src="data/common/developer_logo.png" height="30"></a>
        </td>
        <td style="padding:15px 0;width:25%%;">
            <a href=" http://ai.baidu.com/?edm201701l" target="_blank">
                <img src="data/common/ai_logo.png" height="30">
            </a>
        </td>
        <td colspan="2" style="text-align:right;padding:15px 30px;width:50%%;">
            <a style="line-height:30px;display:inline-block;color:#fff;text-decoration:none;font-size:14px;"
               href="http://ai.baidu.com/?edm201701RU" target="_blank">【浏览百度大脑官网】</a>

        </td>
    </tr>
    <tr>
        <td colspan="4"  style="background-color:#14191d;">
            <a href="http://ai.baidu.com" target="_blank">
                <img width="100%%" src="http://bos.nj.bpc.baidu.com/v1/developer/e3793c1a-1c9f-44d1-8fef-1115e4ee961a.png">
            </a>
        </td>
    </tr>
    """
    
    #header = header % unsubscribe_link.encode('utf8')

    content = """
    <tr>
        <td rowspan="2" style="padding: 15px 30px;width:25%%;">
            <img height="100" src="%s"  width="170" height="100" style="width:170px; height:100px">
        </td>
        <td colspan="3" style="padding: 15px 30px 0 15px;width: 600px;">
            <h2 style="font-size: 16px;color:#666;">
                <a style="color:#666;text-decoration:none;font-size: 16px;" href="%s" target="_blank">%s</a>
            </h2>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="font-size: 14px;color:#999;padding: 0 30px 15px 15px;width: 600px;">
            %s
        </td>
    </tr>
    """.encode('utf-8')

    footer = """
    <tr>
        <td colspan="2" style="padding-top: 15px;text-align:center;width:50%%;">
            <img src="data/common/ai_qr.png" width="200" height="200"></td>
        <td colspan="2" style="padding-top: 15px;text-align:center;width:50%%;">
            <img src="data/common/developer_qr.jpeg" width="200" height="200"></td>
    </tr>
    <tr>
        <td colspan="2" style="padding: 15px;font-size:12px;text-align:center;width:50%%;">更多AI内容，请关注【百度大脑】微信公众号</td>
        <td colspan="2" style="padding: 15px;font-size:12px;text-align:center;width:50%%;">了解百度更多开放技术，请关注【百度开发者中心】微信公众号
        </td>
    </tr>
    <tr>
        <td colspan="4" style="padding: 15px;font-size:12px;text-align:center;">
            请勿回复此邮件，如有问题，欢迎发送邮件到<a href="mailto:developer_support@baidu.com">developer_support@baidu.com</a>咨询
        </td>
    </tr>
    <tr style="background-color: #14191d;height: 30px;">
        <td colspan="3" style="padding:15px 0;text-align:right;">
            <a href="http://developer.baidu.com/?edm201701r" target="_blank">
               <img src="data/common/developer_logo.png" height="30">
            </a>
        </td>
        <td style="padding:15px 30px;text-align:right;width:25%%;">
            <a href="http://ai.baidu.com/?edm201701r" target="_blank">
               <img src="data/common/ai_logo.png" height="30"></a>
            </a>
        </td>
    </tr>
    </tbody>
</table>
</div>
    """
    
    ret_data = header
    
    data = xlrd.open_workbook('%s.xlsx' % xls_prefix)
    table = data.sheets()[0]
    nrows = table.nrows
    for i in range(nrows): 
        if i == 0: 
            continue
        
        title = table.row_values(i)[0]
        link = table.row_values(i)[1]
        abstract = table.row_values(i)[2]
        image = '%s.files/image%03d.png' % (xls_prefix, 2 * i - 1)

        tmp = content % (image, link, title, abstract)
        ret_data += tmp.encode('utf8')
        
    ret_data += footer

    return ret_data


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        log.error('please input email!')
        exit(0)

    email = sys.argv[1]
    xls_prefix = "data/orginal/%s" % (time.strftime("%Y%m%d"))
    #xls_prefix = "data/orginal/20170112"

    
    token = ''
    html_data = gen_mail_content(xls_prefix, email, token)
    content, img_list = get_mail_content(html_data)
    print content.encode('utf8')
    exit(0)
    
    # send('xuyifei@baidu.com', 'test', content, img_list)
    # st = SendThread('xuyifei@baidu.com', 'test', content, img_list)
    # st = SendThread('yuxiangchichu@126.com', 'test', content, img_list)
    st = SendThread(email, '【百度大脑】一周热点', content, img_list)
    st.start()
