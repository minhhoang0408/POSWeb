/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import CSpacer from '../../pieces/Spacer'
import NestedList from '../../pieces/NestedList'

import { Link } from 'react-router-dom'

class Sider extends Component {
    render() {
        return (
            <div id='sider'>
                <div>
                    <Link to="/">
                        <img alt="..." src="https://images.glints.com/unsafe/1200x0/glints-dashboard.s3.amazonaws.com/company-logo/a3197422819b700c2ce91cb347853bb2.png"

                            style={{ width: "150px", padding: "10px", marginLeft: "40px" }} />
                    </Link>
                    <CSpacer />
                </div>
                <div style={{ height: "calc(100% - 60px)", position: "relative" }}>
                    <NestedList />
                    
                </div>
            </div>
        )
    }
}

export default Sider