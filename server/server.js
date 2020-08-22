import { GraphQLServer, PubSub } from 'graphql-yoga';
import short from 'short-uuid';
import { createMessage } from './utill';

const messages = [];

const subscribers = [];

const onMessagesUpdates = fn => subscribers.push(fn);

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]!
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription {
        messages: [Message!]!
    }
`;

const resolvers = {
    Query: {
        messages: () => messages
    },
    Mutation: {
        postMessage: (_, { user, content }) => {
            const message = createMessage(user, content);
            messages.push(message);
            subscribers.forEach(fn => fn());
            return message.id;
        }
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = short.generate();
                onMessagesUpdates(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                return pubsub.asyncIterator(channel);
            }
        }
    }
}

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: { pubsub }
});

server.start(({ port }) => {
    console.log(`Server on http://localhost:${port}`);
})