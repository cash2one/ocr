using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace com.baidu.ai
{
	public class Identify
	{
		// 人脸识别
		public static String identify()
		{
			string token = "########";
			string base645 = FileUtils.getFileBase64("/work/ai/images/face/search5.jpg");
			string host = "https://aip.baidubce.com/rest/2.0/face/v2/identify?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "images=" + HttpUtility.UrlEncode(base645);
			str += "&group_id=demo&user_top_num=1&face_top_num=1";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("人脸识别:");
			Console.WriteLine(result);
			return result;

		}
	}
}
