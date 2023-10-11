import Header from "../../components/Header"
import PropTypes from "prop-types";

const DashboardLayout = ({children}) => {
  return (
    <div>
    <Header/>
      {children}
    </div>
  )
}

export default DashboardLayout
DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
