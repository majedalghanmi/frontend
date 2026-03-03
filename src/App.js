import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const API_URL = 'https://backend-wsx0.onrender.com';

// --- صفحة تسجيل الدخول ---
function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // التحقق من امتلاء الحقول لتفعيل الزر
  const isFormValid = formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('جاري التحقق...');
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      setStatus(res.data.message);
      setIsError(false);
      setTimeout(() => navigate('/phonebook'), 1000);
    } catch (err) {
      setStatus(err.response?.data?.message || 'فشل الدخول');
      setIsError(true);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>نظام الدخول</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input type="text" name="username" placeholder="اسم المستخدم" onChange={handleChange} style={inputStyle} />
        <input type="password" name="password" placeholder="كلمة المرور" onChange={handleChange} style={inputStyle} />
        <button 
          type="submit" 
          disabled={!isFormValid} 
          style={{...buttonStyle, backgroundColor: isFormValid ? '#646cff' : '#ccc', cursor: isFormValid ? 'pointer' : 'not-allowed'}}
        >
          دخول
        </button>
      </form>
      {status && <p style={{ color: isError ? 'red' : 'green' }}>{status}</p>}
    </div>
  );
}

// --- صفحة دليل الهاتف ---
function PhoneBook() {
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');

  // 1. جلب البيانات (عرض الكل)
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setList(res.data);
    } catch (err) { setMsg('خطأ في جلب البيانات'); }
  };

  // 2. حفظ
  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/contacts`, contact);
      setMsg('تم الحفظ');
      fetchData();
    } catch (err) { setMsg('فشل الحفظ'); }
  };

  // 3. تعديل
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/contacts`, contact);
      setMsg('تم التعديل');
      fetchData();
    } catch (err) { setMsg('فشل التعديل'); }
  };

  // 4. حذف
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/contacts/${contact.name}`);
      setMsg('تم الحذف');
      setContact({name: '', phone: ''});
      fetchData();
    } catch (err) { setMsg('فشل الحذف'); }
  };

  return (
    <div style={containerStyle}>
      <h2>📖 دليل الهاتف</h2>
      <div style={formStyle}>
        <input type="text" placeholder="الاسم" style={inputStyle} value={contact.name} onChange={(e)=>setContact({...contact, name: e.target.value})} />
        <input type="text" placeholder="رقم الجوال" style={inputStyle} value={contact.phone} onChange={(e)=>setContact({...contact, phone: e.target.value})} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={handleSave} style={{...buttonStyle, backgroundColor: '#27ae60'}}>حفظ</button>
          <button onClick={handleUpdate} style={{...buttonStyle, backgroundColor: '#f39c12'}}>تعديل</button>
          <button onClick={handleDelete} style={{...buttonStyle, backgroundColor: '#e74c3c'}}>حذف</button>
          <button onClick={fetchData} style={{...buttonStyle, backgroundColor: '#3498db'}}>عرض الكل</button>
        </div>
      </div>
      <p>{msg}</p>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.name} - {item.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/phonebook" element={<PhoneBook />} />
      </Routes>
    </Router>
  );
}

// التنسيقات ثابتة كما طلبت
const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', fontFamily: 'Arial' };
const formStyle = { display: 'flex', flexDirection: 'column', width: '300px' };
const inputStyle = { padding: '12px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'right' };
const buttonStyle = { padding: '12px', color: 'white', border: 'none', borderRadius: '5px', fontSize: '14px' };


////////////////////////////////////////////////////////////////////////////////////////////

// import { useState } from 'react'
// import axios from 'axios'

// function App() {
//   // 1. حالة تخزين البيانات (كما هي)
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
  
//   // 2. حالة تخزين الرسالة واللون (كما هي)
//   const [status, setStatus] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // دالة تسجيل الدخول الأصلية
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     await sendRequest('https://backend-wsx0.onrender.com/login', 'جاري التحقق من الدخول...');
//   };

//   // الدالة الجديدة لإنشاء مستخدم
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     await sendRequest('https://backend-wsx0.onrender.com/register', 'جاري إنشاء الحساب...');
//   };

//   // دالة موحدة لإرسال الطلبات لتقليل تكرار الكود
//   const sendRequest = async (url, loadingMessage) => {
//     setStatus(loadingMessage);
//     setIsError(false);

//     try {
//       const response = await axios.post(url, formData);
//       setStatus(response.data.message);
//       setIsError(false);
//     } catch (error) {
//       if (error.response) {
//         setStatus(error.response.data.message || 'حدث خطأ ما');
//       } else {
//         setStatus('فشل الاتصال بالسيرفر');
//       }
//       setIsError(true);
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>نظام إدارة المستخدمين</h2>
//       <form style={formStyle}>
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
        
//         {/* أزرار التحكم */}
//         <div style={{ display: 'flex', gap: '10px' }}>
//             <button type="button" onClick={handleLogin} style={buttonStyle}>دخول</button>
//             <button type="button" onClick={handleRegister} style={registerButtonStyle}>إنشاء مستخدم جديد</button>
//         </div>
//       </form>

//       {status && (
//         <p style={{ 
//           marginTop: '15px', 
//           color: isError ? 'red' : 'green', 
//           fontWeight: 'bold' 
//         }}>
//           {status}
//         </p>
//       )}
//     </div>
//   );
// }

// // التنسيقات (تمت إضافة تنسيق للزر الجديد)
// const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' };
// const formStyle = { display: 'flex', flexDirection: 'column', width: '300px' };
// const inputStyle = { padding: '12px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'right' };
// const buttonStyle = { flex: 1, padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' };
// const registerButtonStyle = { ...buttonStyle, backgroundColor: '#2ecc71' }; // لون أخضر للتمييز

// export default App;


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
