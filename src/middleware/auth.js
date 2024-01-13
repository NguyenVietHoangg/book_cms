// middleware/auth.js

export function requireAuth(to, from, next) {
  const isLoggedIn = localStorage.getItem("KEY_USER_STORAGE") != null;

  if (!isLoggedIn) {
    // Nếu không đăng nhập, chuyển hướng đến trang đăng nhập
    next("/auth");
  } else {
    // Nếu đã đăng nhập, cho phép truy cập
    next();
  }
}
export function checkRole (to, from, next){
  const isLoggedIn = localStorage.getItem("KEY_USER_STORAGE")
}