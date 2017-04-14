using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace com.baidu.ai
{
	public class AddUser
	{
		//组内添加用户
		public static String adduser()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/adduser?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			string str = "group_id=demo&uid=songqingyun2";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("组内添加用户:");
			Console.WriteLine(result);
			return result;
		}
	}
}
