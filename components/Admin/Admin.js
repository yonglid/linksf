import React, { PropTypes } from 'react'

import { fetchLocations } from '../../core/firebaseRestAPI'
import history from '../../core/history';

import Loading from '../Loading'
import AdminTopBar from '../AdminTopBar'
import OrganizationList from '../OrganizationList'
import OrganizationEdit from '../OrganizationEdit'
import LocationEdit from '../LocationEdit'

import history from '../../core/history';
import { fetchOrganizations } from '../../core/firebaseApi'


class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      selectedCategories: [],
      matchingSearchOrganizations: null,
      showEditPage: false,
      currentOrganization: null,
    }
  }

  componentWillMount() {
    fetchOrganizations()
      .then(organizations => {
        this.setState({ organizations })
      })
  }

  handleSearch = (event) => {
    const searchTerm = event.currentTarget.value
    const { organizations } = this.state
    const organizationMatchesSearch = (organization) => (organization.name.indexOf(searchTerm) >= 0)
    const newMatchingSearchOrganizations = searchTerm ?
      organizations.filter(organizationMatchesSearch) :
      null

    this.setState({ matchingSearchOrganizations: newMatchingSearchOrganizations })
  }

  handleNewOrganization = () => {

  }

  renderEditPage = (organization) => {
    this.setState({ showEditPage: true, currentOrganization: organization })
  }

  render() {
    const {
      organizations,
      selectedCategories,
      matchingSearchOrganizations,
      showEditPage,
      currentOrganization
    } = this.state

    const loading = locations == null
    let filteredLocations = null

    if (matchingSearchLocations) {
      const a = new Set(locations)
      const b = new Set(matchingSearchLocations)
      filteredLocations = [...(new Set([...a].filter(x => b.has(x))))]
    }

    if (matchingCategoryLocations) {
      const a = new Set(filteredLocations || locations)
      const b = new Set(matchingCategoryLocations)
      filteredLocations = [...(new Set([...a].filter(x => b.has(x))))]
    }

    return (
      <div>
        <AdminTopBar
          selectedCategories={selectedCategories}
          onSearch={this.handleSearch}
          onNewOrganization={this.handleNewOrganization}
        />
        { loading ?
          <Loading /> :
          (showEditPage ?
            <OrganizationEdit organization={currentOrganization}/> :
            <OrganizationList organizations={matchingSearchOrganizations || organizations} editLink={this.renderEditPage} />) }
      </div>
    )
  }

}

export default Admin
