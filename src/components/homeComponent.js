import React, { useState, useEffect } from 'react'

import classes from './Home.css'

const Home = (props) => {
    const [categoryList, setCategoryList] = useState([])
    //const [productList, setProductList] = useState({})
    const [productListData, setProductListData] = useState({})
    const [viewButton, setViewButton] = useState(false)
    const [listData, setListData] = useState({
        heading: 'Loading...',
        changeButton: false,
        changeButtonData: '',
    })


    useEffect(() => {
        props.getCategoryData()
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    useEffect(() => {
        if (props.categoryList.length) {
            setCategoryList(props.categoryList)
            props.getProductList(props.categoryList[0]?.category_id)
        }
        // if (props.productList)
        //     setProductList(props.productList)
        if (props.heading) {
            setListData(prevState => {
                return {
                    ...prevState,
                    heading: props.heading
                }
            })
        }
    }, [props.heading])



    useEffect(() => {
        if (props.productListData)
            setProductListData(props.productListData)
    }, [props.productListData])

    const categoryItemClicked = (catId) => {
        props.getProductList(catId)
        setViewButton(false)
    }

    const handleClickOutside = (event) => {
        if (document.getElementById('outerListDiv') && !document.getElementById('outerListDiv').contains(event.target)) {
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: !prevState.changeButton
                }
            })
        }
    }


    console.log(productListData, 'ln 68')

    const showProductList = () => {
        let newProductList = []
        if (viewButton) {
            newProductList = productListData.products.slice(0, productListData.count)
        } else {
            newProductList = productListData.products.slice(0, 3)
        }

        const products = newProductList.map(item => {
            return (
                <div className={classes.outerListDiv}>
                    <div className={classes.listImageDiv}>
                        <img src={item.image_urls.x120} alt={item.name} />
                    </div>
                    <div className={classes.listNameDiv}>
                        <div>
                            <p className={classes.list_name}>{item.name}</p>
                            <div className={classes.listPriceDiv}>
                                <p className={classes.list_weight}>{`(${item.weight} ${item.weight_unit})`}</p>
                                <div >
                                    <p className={classes.list_final_price}>{`₹ ${item.final_price}`}</p>
                                    <p className={classes.price_list}>{item.price > item.final_price && `₹ ${item.price}`}</p>
                                </div>
                            </div>
                            <button className={item.is_in_stock ? classes.greenButton : classes.greyButton}>
                                {item.is_in_stock ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </button>
                        </div>
                    </div>
                    <div className={classes.ratingDiv}>
                        <span>{`${item.rating ? item.rating : '0'} ⭐`}</span>
                    </div>
                </div>
            )
        })

        return products
    }

    const viewButtonClicked = () => {
        setViewButton(!viewButton)
    }

    const categoryChangeHandler = (id) => {
        categoryItemClicked(id)
        setListData(prevState => {
            return {
                ...prevState,
                changeButton: false
            }
        })
    }

    const changeButtonHandler = () => {
        console.log(listData.changeButton, 'changeButton')
        if (listData.changeButton) {
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: false
                }
            })
            console.log('change button clicked if')
        } else {
            const newCategory = (
                <div className={classes.changeButtonData} id='outerListDiv'>
                    <ul >
                        {categoryList.length && categoryList.map((item, index) => {
                            return (
                                <div>
                                    <li key={item.category_id + index} onClick={() => categoryChangeHandler(item.category_id)}>{item.category_name}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )
            // return newCategory
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: true,
                    changeButtonData: newCategory
                }
            })
            console.log('change button clicked else')
        }
    }

    return (
        <div>
            <div className={classes.bannerRoot}>
                <div className={classes.heading}>
                    <h2>{listData.heading}</h2>
                </div>
                <div>
                    <div>
                        <div className={classes.categoryList}>
                            <ul>
                                <li><button>View All</button></li>
                                {categoryList.length ? categoryList.map(list => (
                                    <li key={list.category_id} style={{ backgroundImage: `url(${list.category_image})` }} key={list.category_id} onClick={() => categoryItemClicked(list.category_id)}>
                                        {/* <img src={list.category_image} alt={} /> */}
                                        <span>{list.category_name}</span>
                                    </li>
                                )) : 'Loading...'}
                                <li><button>View All</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {productListData.count ? showProductList() : null}
                    </div>
                </div>
                {listData.changeButton && listData.changeButtonData}
                <div>
                    <div className={classes.featureButton}>
                        <button onClick={() => changeButtonHandler()}>change</button>
                        <button onClick={() => viewButtonClicked()}>{viewButton ? '[-] View Less' : '[+] View More'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
