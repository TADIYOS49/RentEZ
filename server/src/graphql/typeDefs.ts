import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Booking {
        id: ID!
        listing: Listing!
        tenant: User!
        checkIn: String!
        checkOut: String!
    }

    type Bookings {
        total: Int!
        result: [Booking!]!
    }

    enum ListingType {
        LAPTOP
        ELECTRONICS
    }

    enum ListingsFilter {
        PRICE_LOW_TO_HIGH
        PRICE_HIGH_TO_LOW
        HIGHEST_RATED
    }

    type Listing {
        id: ID!
        title: String!
        description: String!
        image: String!
        host: User!
        type: ListingType!
        address: String!
        city: String!
        bookings(limit: Int!, page: Int!): Bookings
        bookingsIndex: String!
        price: Int!
        reviews: [Review!]!
        numReviews: Int!
        rating: Float!
    }

    type Listings {
        region: String
        total: Int! # total number of objects that can be queried
        result: [Listing!]!
    }

    type User {
        id: ID!
        name: String!
        avatar: String!
        contact: String!
        hasWallet: Boolean!
        income: Int
        bookings(limit: Int!, page: Int!): Bookings
        listings(limit: Int!, page: Int!): Listings!
        chats: [Chat!]
    }

    # currently logged in user
    type Viewer {
        id: ID
        token: String
        avatar: String
        hasWallet: Boolean
        didRequest: Boolean! # boolean to identify if we already attempted to obtain Viewers's info
    }

    type Message {
        id: ID!
        content: String!
        author: User!
        createdAt: String!
    }

    type Chat {
        id: ID!
        participants: [User!]!
        messages: [Message!]!
    }

    type Review {
        id: ID!
        rating: Float!
        comment: String
        createdAt: String!
        author: User!
    }

    input LogInInput {
        code: String!
    }

    input HostListingInput {
        title: String!
        description: String!
        image: String!
        type: ListingType!
        address: String!
        price: Int!
        
    }

    input UpdateListingInput {
        title: String!
        description: String!
        image: String
        type: ListingType!
        price: Int!
        
    }

    type UpdateListingResult {
        id: ID!
    }

    input ConnectStripeInput {
        code: String!
    }

    input CreateBookingInput {
        id: ID!
        source: String!
        checkIn: String!
        checkOut: String!
    }

    input CreateMessageInput {
        content: String!
        to: String!
    }

    input CreateReviewInput {
        listingId: String!
        rating: Float!
        comment: String
    }

    input DeleteReviewInput {
        listingId: String!
        reviewId: String!
    }

    type Query {
        authUrl: String!
        user(id: ID!): User!
        listing(id: ID!): Listing!
        listings(
            location: String
            filter: ListingsFilter!
            limit: Int!
            page: Int!
        ): Listings!
        chat(recipient: String!): Chat!
    }

    type Mutation {
        logIn(input: LogInInput): Viewer!
        logOut: Viewer!
        hostListing(input: HostListingInput!): Listing!
        updateListing(id: ID!, input: UpdateListingInput!): UpdateListingResult!
        createBooking(input: CreateBookingInput!): Booking!
        createMessage(input: CreateMessageInput!): Message!
        createReview(input: CreateReviewInput!): Review!
        deleteReview(input: DeleteReviewInput!): Review!
    }

    type Subscription {
        listingBooked(hostId: ID!, isHost: Boolean!): Listing!
        sendMessage(to: ID!): Message!
    }
`;
