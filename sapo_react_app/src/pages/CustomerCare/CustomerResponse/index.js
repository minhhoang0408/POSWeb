import React, { Component } from 'react'
import CSpacer from '../../../components/pieces/Spacer'
import CommentModal from '../../../components/part/CommentModal'

class CustomerResponse extends Component {
    render() {
        return (
            <div>
                <div>This is customer response page</div>
                <CSpacer />
                {/* <CResponse /> */}
                <CommentModal />
            </div>

        )
    }
}

export default CustomerResponse