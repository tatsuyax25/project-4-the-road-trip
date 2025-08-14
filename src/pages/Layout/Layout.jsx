
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function Layout({user, handleLogout}) {
  return (
    <div className="ui grid">
      <div className="ui grid".Row>
        <div className="ui grid".Column>
          <Header user={user} handleLogout={handleLogout}/>
        </Grid.Column>
      </Grid.Row>
      <div className="ui grid".Row>
        <div className="ui grid".Column>
          <Outlet />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
}