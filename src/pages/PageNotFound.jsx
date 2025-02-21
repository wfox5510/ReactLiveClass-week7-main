import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigte = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigte("/")
    },3000)
  },[])
  return (
    <>
      <div className="container">
        <h2 className="fw-bold mb-4">404 PageNotFound</h2>
        <p>您所查看的頁面並不存在</p>
        <span className="fw-bold" style={{fontSize:"14px"}}>將於三秒後跳轉回首頁......</span>
      </div>
    </>
  );
};

export default PageNotFound;