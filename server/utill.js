import short from 'short-uuid';

export const createMessage = (user, content) => {
    const id = short.generate();

    return {
        id,
        user,
        content
    }
}