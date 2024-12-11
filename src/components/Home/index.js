import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Cookies from 'js-cookie'
import './index.css'
const Home = props => {
  const onClickfindJobsBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }
  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="homeRoute">
      <Header />
      <div className="homeInformation">
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p className="homeDescription">
          Millions of people searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <button className="findJobsBtn" onClick={onClickfindJobsBtn}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
