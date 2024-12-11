import {Component} from 'react'
import Header from '../Header'
import JobItemDetailsRoute from '../JobItemDetailsRoute'
import Cookies from 'js-cookie'
import {IoMdStarOutline} from 'react-icons/io'
import {MdOutlineLocationOn} from 'react-icons/md'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    salary:0,
    employementType:[]
  }
  onChangesearch = event => {
    this.setState({searchInput: event.target.value},this.getJobsDetails)
  }
  componentDidMount() {
    this.getJobsDetails()
  }
  changeSalary = salaryAmt=>{
   this.setState({salary:salaryAmt},this.getJobsDetails)
  }
  changeEmployementType = type=>{
    this.setState(prevState => ({employementType:[...prevState,type]}),this.getJobsDetails)
  }
  getJobsDetails = async () => {
    const {searchInput,salary,employementType} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${salary}&employment_type=${employementType.join()}`,
      options,
    )
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      id: each.id,
      jobDescription: each.job_description,
      employmentType: each.employment_type,
      location: each.location,
      title: each.title,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
    }))
    console.log(updatedData)
    this.setState({jobsList: updatedData})
  }
  render() {
    const {jobsList, searchInput} = this.state
    return (
      <div className="jobsRoute">
        <Header />
        <div className="jobPortal">
          <div className="filters">
            <div className="profileContainer"></div>
            <hr className="lines" />
            <p className="employmentSalaryTitle">Type Of Employement</p>
            <ul className="employmentSalaryDetailsContainer">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId} onChange={()=>this.changeEmployementType(each.label)}>
                  <input
                    type="checkbox"
                      id={each.employmentTypeId}
                    className="employeSalaryInput"
                  />
                  <label
                  
                    htmlFor={each.employmentTypeId}
                    className="employeSalaryLabels"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <p className="employmentSalaryTitle">Salary Range</p>
            <ul className="employmentSalaryDetailsContainer">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} onChange={()=>this.changeSalary(each.salaryRangeId)}>
                  <input
                    type="radio"
                     id={each.salaryRangeId}
                    className="employeSalaryInput"
                    name="salary"
                  />
                  <label
                   
                    htmlFor={each.salaryRangeId}
                    className="employeSalaryLabels"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobsDetailsRoute">
            <input
              type="search"
              onChange={this.onChangesearch}
              value={searchInput}
            />
            <ul className="jobsDetails">
              {jobsList.map(each => (
                <li key={each.id} className="jobs">
                  <div className="companyDetails">
                    <img src={each.companyLogoUrl} className="companyLogo" />
                    <div className="titleRating">
                      <p className="">{each.title}</p>
                      <div className="rating">
                        <IoMdStarOutline />
                        <p>{each.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="locationTypePackage">
                    <div className="locationType">
                      <p>{each.location}</p>

                      <p className="employementType">{each.employmentType}</p>
                    </div>
                    <p>{each.packagePerAnnum}</p>
                  </div>
                  <hr />
                  <p>Description</p>
                  <p>{each.jobDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
