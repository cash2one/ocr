using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using Mono.Web;

namespace com.baidu.ai
{
	public class Antiporn
	{
		// 黄反识别
		public static string detect()
		{
			string strbaser64 = FileUtils.getFileBase64("/work/ai/images/ocr/general.jpeg"); // 图片的base64编码
			string host = "https://aip.baidubce.com/rest/2.0/antiporn/v1/detect?access_token=" + AccessToken.TOKEN;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "image=" + HttpUtility.UrlEncode(strbaser64);
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("黄反识别:");
			Console.WriteLine(result);
			return result;
		}

		// GIF色情图像识别
		public static string detect_gif()
		{
			string strbaser64 = FileUtils.getFileBase64("/work/ai/images/ocr/general.jpeg"); // 图片的base64编码
			string host = "https://aip.baidubce.com/rest/2.0/antiporn/v1/detect_gif?access_token=" + AccessToken.TOKEN;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "image=" + HttpUtility.UrlEncode(strbaser64);
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("GIF色情图像识别:");
			Console.WriteLine(result);
			return result;
		}
	}
}
