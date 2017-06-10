using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace com.baidu.ai
{
	public class Commenttag
	{
		// 评论观点抽取接口
		public static string commenttag()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/comment_tag?access_token=" + token;
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("comment", "个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错"));
			paraList.Add(new KeyValuePair<string, string>("entity", "NULL"));
			paraList.Add(new KeyValuePair<string, string>("type", "10"));
			Dictionary<string, object> para = new Dictionary<string, object>();
			para.Add("comment", "个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错");
			para.Add("entity", "NULL");
			para.Add("type", "10");

			Encoding encoding = Encoding.GetEncoding("GBK");
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/json";
			request.KeepAlive = true;
			JavaScriptSerializer json = new JavaScriptSerializer();
			String str = json.Serialize(para);
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GBK"));
			string result = reader.ReadToEnd();
			Console.WriteLine("评论观点抽取接口:");
			Console.WriteLine(result);
			return result;
		}
	}
}
