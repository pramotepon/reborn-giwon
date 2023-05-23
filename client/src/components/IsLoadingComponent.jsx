import React from 'react'
import '../assets/css/components/IsLoading.css'

const IsLoadingComponent = (props) => {
    const position = props.position || 'position-absolute';
    return (
        <div className={position + ' w-100 h-100 my-bg-loading top-0 start-0 z-200'}>
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingComponent