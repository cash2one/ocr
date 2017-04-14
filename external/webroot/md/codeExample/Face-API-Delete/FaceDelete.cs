﻿using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace APIFace
{
	public class Delete
	{
		// 人脸删除
		public static String delete()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/delete?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "uid=songqingyun";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("人脸删除:");
			Console.WriteLine(result);
			return result;
		}
	}
}