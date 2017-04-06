using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using Mono.Web;

namespace com.baidu.ai
{
	public static class FaceMatch
	{
		// 人脸比对
		public static string match()
		{
			string base643 = FileUtils.getFileBase64("/work/ai/images/face/search3.jpg");
			string base642 = FileUtils.getFileBase64("/work/ai/images/face/search2.jpg");
			string base644 = FileUtils.getFileBase64("/work/ai/images/face/search4.jpg");
			string host = "https://aip.baidubce.com/rest/2.0/faceverify/v1/match?access_token=" + AccessToken.TOKEN;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "images=" + HttpUtility.UrlEncode(base643 + "," + base642 + "," + base644);
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("人脸比对:");
			Console.WriteLine(result); 
			return result;
		}
			
	}
}
