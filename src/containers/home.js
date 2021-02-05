import { connect } from 'react-redux'
import HomeComponent from '../components/homeComponent'
import * as actions from '../redux/actions/index'

const mapStateToProps = state => {
    return {
        heading: state.heading,
        categoryList: state.categoryList,
        productList: state.productList,
        productListData: state.productListData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCategoryData: () => dispatch(actions.getCategoryData()),
        getProductList: (catId) => dispatch(actions.getProductList(catId))
    };
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent)

export default Home;


