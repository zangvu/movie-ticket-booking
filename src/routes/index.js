import AddMovie from "../containers/admin/AddMovie/AddMovie";
import Dashboard from "../containers/admin/Dashboard/Dashboard";
import UserManagement from "../containers/admin/UserManagement/UserManagement";
import AddUser from "../containers/admin/UserManagement/AddUser/AddUser";
import Home from "../containers/client/Home/Home";
import MovieDetail from "../containers/client/MovieDetail/MovieDetail";
import TheaterDetail from "../containers/client/TheaterDetail/TheaterDetail";
import UpdateUser from "../containers/admin/UserManagement/UpdateUser/UpdateUser";
import LichSuDatVe from "../containers/client/BookingHistory/LichSuDatVe";
import Booking from "../containers/client/Booking/Booking";
import UpdateProfile from "../containers/client/UpadateProfile/UpdateProfile";
import Signup from "../containers/shared/Auth/Signup/Signup";

export const clientRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/movie-detail/:movieId",
    component: MovieDetail,
    exact: false,
    isPrivate: false,
  },
  {
    path: "/theater-detail/:theaterId",
    component: TheaterDetail,
    exact: false,
    isPrivate: false,
  },
  {
    path: "/thongTinNguoiDung",
    component: LichSuDatVe,
    exact: false,
    isPrivate: false,
  },
  {
    path: "/booking/:bookingId",
    component: Booking,
    exact: false,
    isPrivate: true,
  },
];
export const adminRoutes = [
  {
    path: "/admin",
    component: Dashboard,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/admin/user-management",
    component: UserManagement,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/admin/movie-detail/:movieId',
    component: AddMovie,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/admin/add-user",
    component: AddUser,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/admin/update-user/:userId",
    component: UpdateUser,
    exact: true,
    isPrivate: true,
  },
];
