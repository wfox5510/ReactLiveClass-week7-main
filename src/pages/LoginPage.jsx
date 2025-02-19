import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const LoginPage = () => {
  const navigate= useNavigate();
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexTokenWeek2\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    token !== "" &&
      (async () => {
        try {
          await axios.post(
            `${API_BASE}/api/user/check`,
            {},
            {
              headers: {
                Authorization: token,
              },
            }
          );
          navigate("/admin/productList");
        } catch (error) {
          alert(error.response.data.message);
        }
      })();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API_BASE}/admin/signin`, {
        username: formData.username,
        password: formData.password,
      });

      const oneMonthInSeconds = 30 * 24 * 60 * 60; // 30 天
      document.cookie = `hexTokenWeek2=${res.data.token}; max-age=${oneMonthInSeconds}`;
      navigate("/admin/productList");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    setFormData((preFormData) => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container login py-5" style={{ width: "600px" }}>
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
        <div className="col-8">
          <form id="form" className="form-signin" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                value={formData.username}
                onChange={handleInputChange}
                name="username"
                required
                autoFocus
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
};

export default LoginPage;
