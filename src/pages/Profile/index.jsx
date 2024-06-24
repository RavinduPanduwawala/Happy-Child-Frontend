import React, { useState, useEffect } from "react";
import { Card, CardBody, Input, Button, Spinner } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper"

const Profile = () => {

    const [profileInfo, setProfileInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchProfileInfo()
    }, [])

    const handleUserPermissions = async () => {
        const storedUser = JSON.parse(localStorage.getItem('USER'));
        const currentUser = storedUser ? { userId: storedUser._id } : null;

        return currentUser;
    }

    const fetchProfileInfo = async () => {
        const user = await handleUserPermissions()

        try {
            const res = await get(`user/me/${user.userId}`); // Change to include type in the URL path

            if (res.error) {
                return toast.error('Something went wrong', {
                    autoClose: 3000,
                });
            }

            setProfileInfo(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdateButtonClick = async () => {
        setIsLoading(true)

        try {
            if (profileInfo?._id?.length) {

                const { email, ...payloadWithoutEmail } = profileInfo;

                const res = await put(`/user/${profileInfo?._id}`, payloadWithoutEmail)

                if (res.error) {
                    setIsLoading(false)

                    return toast.error('Something went wrong', {
                        autoClose: 3000,
                    })
                }

                toast.success('Profile edited successfully!', {
                    autoClose: 3000,
                })

                setIsLoading(false)

                await fetchProfileInfo()

            }
        } catch (error) {
            console.error("An error occurred while editing profile!", error);
            toast.error('An error occurred while editing profile!', {
                autoClose: 1000,
            })

            setIsLoading(false)
        }
    }

    return (
        <Card className="w-50 m-auto pb-4">
            <CardBody>
                <h4 className="text-center">My Profile</h4>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <Input
                        name="name"
                        className="form-control"
                        placeholder="Enter creator Full Name"
                        type="text"
                        value={profileInfo.fullName}
                        onChange={(e) => setProfileInfo((prevState) => ({
                            ...prevState,
                            fullName: e.target.value
                        }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <Input
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        type="tel"
                        value={profileInfo.phone}
                        onChange={(e) => setProfileInfo((prevState) => ({
                            ...prevState,
                            phone: e.target.value
                        }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <Input
                        name="email"
                        label="Email Address"
                        className="form-control"
                        placeholder="Email Address"
                        type="email"
                        disabled={true}
                        value={profileInfo.email}
                    />
                </div>
            </CardBody>
            <Button
                className="btn btn-base btn-rounded-full m-auto w-50 waves-effect waves-light"
                color="primary"
                onClick={handleUpdateButtonClick}
                disabled={isLoading}
            >
                {isLoading ? <Spinner size="sm" color="light" /> : "Update"}
            </Button>
            <ToastContainer />
        </Card>
    );
}

export default Profile;