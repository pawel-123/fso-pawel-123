import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
    if (successMessage === null && errorMessage === null) {
        return null
    }

    const notificationStyleSuccess = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const notificationStyleError = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={successMessage ? notificationStyleSuccess : notificationStyleError}>
            {successMessage || errorMessage}
        </div>
    )
}

export default Notification