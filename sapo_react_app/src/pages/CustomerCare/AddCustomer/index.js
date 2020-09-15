import React, { Component } from 'react'
import CSpacer from '../../../components/pieces/Spacer'
import CTitle from '../../../components/pieces/Title'
import CustomerInputForm from '../../../components/part/CustomerInputForm'

class AddCustomer extends Component {
    render() {
        return (
            <div>
                <div>
                    <CTitle>Thêm mới khách hàng</CTitle>
                </div>
                <CSpacer />
                <div>
                    <CustomerInputForm />
                </div>
            </div>
        )
    }
}

export default AddCustomer