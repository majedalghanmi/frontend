import { useState } from 'react'
import axios from 'axios'

function App() {
  // 1. حالة تخزين البيانات (كما هي)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // 2. حالة تخزين الرسالة واللون (كما هي)
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // دالة تسجيل الدخول الأصلية
  const handleLogin = async (e) => {
    e.preventDefault();
    await sendRequest('https://backend-wsx0.onrender.com/login', 'جاري التحقق من الدخول...');
  };

  // الدالة الجديدة لإنشاء مستخدم
  const handleRegister = async (e) => {
    e.preventDefault();
    await sendRequest('https://backend-wsx0.onrender.com/register', 'جاري إنشاء الحساب...');
  };

  // دالة موحدة لإرسال الطلبات لتقليل تكرار الكود
  const sendRequest = async (url, loadingMessage) => {
    setStatus(loadingMessage);
    setIsError(false);

    try {
      const response = await axios.post(url, formData);
      setStatus(response.data.message);
      setIsError(false);
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.message || 'حدث خطأ ما');
      } else {
        setStatus('فشل الاتصال بالسيرفر');
      }
      setIsError(true);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>نظام إدارة المستخدمين</h2>
      <form style={formStyle}>
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          onChange={handleChange}
          style={inputStyle}
          required
        />
        
        {/* أزرار التحكم */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleLogin} style={buttonStyle}>دخول</button>
            <button type="button" onClick={handleRegister} style={registerButtonStyle}>إنشاء مستخدم جديد</button>
        </div>
      </form>

      {status && (
        <p style={{ 
          marginTop: '15px', 
          color: isError ? 'red' : 'green', 
          fontWeight: 'bold' 
        }}>
          {status}
        </p>
      )}
    </div>
  );
}

// التنسيقات (تمت إضافة تنسيق للزر الجديد)
const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' };
const formStyle = { display: 'flex', flexDirection: 'column', width: '300px' };
const inputStyle = { padding: '12px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'right' };
const buttonStyle = { flex: 1, padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' };
const registerButtonStyle = { ...buttonStyle, backgroundColor: '#2ecc71' }; // لون أخضر للتمييز

export default App;


///////////////////////////////////////////////////////////////////////////////////////
// import { useState } from 'react'
// import axios from 'axios'

// function App() {
//   // 1. حالة تخزين البيانات
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
  
//   // 2. حالة تخزين الرسالة التي ستظهر للمستخدم
//   const [status, setStatus] = useState('');
//   // حالة اختيار لون الرسالة (أخضر للنجاح، أحمر للفشل)
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('جاري التحقق...');
//     setIsError(false);

//     try {
//       // محاولة إرسال البيانات
//       const response = await axios.post('https://backend-wsx0.onrender.com/login', formData);
      
//       // إذا نجح الطلب (Status 200)
//       setStatus(response.data.message);
//       setIsError(false);
//     } catch (error) {
//       // إذا حدث خطأ (مثل 401 Unauthorized)
//       if (error.response) {
//         // هنا نستخرج الرسالة التي أرسلها السيرفر في الاحالة الثانية
//         setStatus(error.response.data.message);
//       } else {
//         // في حال كان السيرفر متوقفاً تماماً
//         setStatus('فشل الاتصال بالسيرفر');
//       }
//       setIsError(true);
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>تسجيل الدخول</h2>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <input
//           type="text"
//           name="username"
//           placeholder="اسم المستخدم"
//           onChange={handleChange}
//           style={inputStyle}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="كلمة المرور"
//           onChange={handleChange}
//           style={inputStyle}
//           required
//         />
//         <button type="submit" style={buttonStyle}>دخول</button>
//       </form>

//       {/* عرض الرسالة بتنسيق ملون بناءً على الحالة */}
//       {status && (
//         <p style={{ 
//           marginTop: '15px', 
//           color: isError ? 'red' : 'green', // أحمر للفشل، أخضر للنجاح
//           fontWeight: 'bold' 
//         }}>
//           {status}
//         </p>
//       )}
//     </div>
//   );
// }

// // التنسيقات
// const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' };
// const formStyle = { display: 'flex', flexDirection: 'column', width: '300px' };
// const inputStyle = { padding: '12px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'right' };
// const buttonStyle = { padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' };

// export default App;
