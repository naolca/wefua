class Reply {
    constructor (parentTweetId, userId, content, timeStamp, likesCount, retweetsCount, repliesCount) {
        this.parentTweetId = parentTweetId;
        this.userId = userId;
        this.content = content;
        this.timeStamp = timeStamp;
        this.likesCount = likesCount;
        this.retweetsCount = retweetsCount;
        this.repliesCount = repliesCount;
        

    }

    static fromFirestore(doc){
        const data = doc.data();
        return new Reply(
            data.parentTweetId,
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
            parentTweetId: this.parentTweetId,
            userId: this.userId,
            content: this.content,
            timeStamp: this.timeStamp,
            likesCount: this.likesCount,
            retweetsCount: this.retweetsCount,
            repliesCount: this.repliesCount
        }
    }
}

module.exports = Reply;