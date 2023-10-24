

class Tweet {
    constructor (userId, content, timeStamp, likesCount, retweetsCount, repliesCount) {
        this.userId = userId;
        this.content = content;
        this.timeStamp = timeStamp;
        this.likesCount = likesCount;
        this.retweetsCount = retweetsCount;
        this.repliesCount = repliesCount;
        

    }

    static fromFirestore(doc){
        const data = doc.data();
        return new Tweet(
            data.userId,
            data.content,
            data.timeStamp,
            data.likesCount, 
            data.retweetsCount,
            data.repliesCount 
        )
    }

    toObject() {
        return {
            userId: this.userId,
            content: this.content,
            timeStamp: this.timeStamp,
            likesCount: this.likesCount,
            retweetsCount: this.retweetsCount,
            repliesCount: this.repliesCount
        }
    }
}

module.exports = Tweet;