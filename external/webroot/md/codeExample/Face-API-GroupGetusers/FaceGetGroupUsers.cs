﻿using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace com.baidu.ai
{
	public class GetUser
	{
		// 组内用户列表查询
		public static String getusers()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rest/2.0/face/v2/faceset/group/getusers?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			string str = "group_id=demo&start=0&end=100";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("组内用户列表查询:");
			Console.WriteLine(result);
			return result;
		}
	}
}
