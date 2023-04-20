import React from "react";
import { Avatar, Button, Card, Divider, Typography, Tag } from "antd";
import { useMutation } from "@apollo/client";
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";
// import { DISCONNECT_STRIPE } from "../../../../lib/graphql/mutations";
// import { DisconnectStripe as DisconnectStripeData } from "../../../../lib/graphql/mutations/DisconnectStripe/__generated__/DisconnectStripe";
import {
    displayErrorMessage,
    displaySuccessNotification,
    formatListingPrice,
    iconColor,
    // stripeAuthUrl,
} from "../../../../lib/utils";
import { Viewer } from "../../../../lib/types";
import { UserChats } from "../UserChats";
import { Link } from "react-router-dom";

interface Props {
    user: UserData["user"];
    viewerIsUser: boolean;
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
    handleUserRefetch: () => void;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({
    user,
    viewerIsUser,
    viewer,
    setViewer,
    handleUserRefetch,
}: Props) => {
    

    const redirectToHosting = () => {
        window.location.href = "localhost:3000/host";
    };

    const additionalDetails = true ? (
        <>
            <Paragraph>
                <Tag color="green">User Registered</Tag>
            </Paragraph>
            <Paragraph>
                Income Earned:{" "}
                <Text strong>
                    {`$0`}
                </Text>
            </Paragraph>
            {/* <Button
                type="primary"
                className="user-profile__details-cta"
                loading={loading}
                onClick={() => disconnectStripe()}
            >
                Disconnect Stripe
            </Button> */}
            {/* <Paragraph type="secondary">
                By disconnecting, you won't be able to receive{" "}
                <Text strong>any further payments</Text>. This will prevent
                users from booking listings that you might have already created.
            </Paragraph> */}
        </>
    ) : (
        <>
            <Paragraph>
                Interested in becoming a RentEZ host and rent out your
                Laptop or Electronics? Register with your account!
            </Paragraph>
            <Button
                type="primary"
                className="user-profile__details-cta"
                onClick={redirectToHosting}
            >
                Start Hosting
            </Button>
           
        </>
    );

    const additionalDetailsSection = viewerIsUser ? (
        <>
            <Divider />
            <div className="user-profile__details">
                <Title level={4}>Additional Details</Title>
                {additionalDetails}
                <Divider />
                <UserChats viewer={viewer} chats={user.chats} />
            </div>
        </>
    ) : null;

    return (
        <div className="user-profile">
            <Card className="user-profile__card">
                <div className="user-profile__avatar">
                    <Avatar size={100} src={user.avatar} />
                </div>
                <Divider />
                <div className="user-profile__details">
                    <Title level={4}>Details</Title>
                    <Paragraph>
                        Name: <Text strong>{user.name}</Text>
                    </Paragraph>
                    <Paragraph>
                        Contact: <Text strong>{user.contact}</Text>
                    </Paragraph>
                </div>

                <div
                    style={{
                        display:
                            viewer.id && viewer.id === user.id
                                ? "none"
                                : "block",
                    }}
                >
                    <Divider />
                    <Link
                        to={
                            viewer.id && viewer.token
                                ? `/chat/${user.id}`
                                : "/login"
                        }
                    >
                        <Button type="primary">Message</Button>
                    </Link>
                </div>

                {additionalDetailsSection}
            </Card>
        </div>
    );
};
