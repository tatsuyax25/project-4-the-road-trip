
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function Layout({user, handleLogout}) {
  return (
    <div className="ui grid">
      <div className="row">
        <div className="ui column">
          <Header user={user} handleLogout={handleLogout}/>
        </Grid.Column>
      </Grid.Row>
      <div className="row">
        <div className="ui column">
          <Outlet />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
}