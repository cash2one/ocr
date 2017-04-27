using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace com.baidu.ai
{
	public class Get
	{
		// 用户信息查询
		public static String get()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rest/2.0/face/v2/faceset/user/get?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			string str = "&uid=songqingyun";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("用户信息查询:");
			Console.WriteLine(result);
			return result;
		}
	}
}
