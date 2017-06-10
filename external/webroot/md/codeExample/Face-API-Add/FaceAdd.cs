using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace com.baidu.ai
{
	public class Add
	{
		// 人脸注册
		public static string add()
		{
			string token = "########";
			string base641 = FileUtils.getFileBase64("/work/ai/images/face/search1.jpg");
			string base642 = FileUtils.getFileBase64("/work/ai/images/face/search2.jpg");

			string host = "https://aip.baidubce.com/rest/2.0/face/v2/faceset/user/add?access_token=" + token;
			Encoding encoding = Encoding.Default;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/x-www-form-urlencoded";
			request.KeepAlive = true;
			String str = "images=" + HttpUtility.UrlEncode(base641 + "," + base642);
			str += "&uid=songqingyun&user_info={'k':'v','k2':'v2','k3':'v3'}&group_id=demo";
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
			string result = reader.ReadToEnd();
			Console.WriteLine("人脸注册:");
			Console.WriteLine(result);
			return result;

		}
	}
}
