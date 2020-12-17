import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as rxjs from 'rxjs';
import { map } from 'rxjs/operators';
import LikeList from './LikeList';

class TweetList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            originalTweets: [],
            currentTime: Date.now()
        }
    }

    componentDidMount() {
        const { interval, merge } = rxjs;
        const createTweetSource = (frequency, account, attribute) => {
            return interval(frequency).pipe(map(i => ({
                account,
                timestamp: Date.now(),
                content: `${attribute} Tweet number ${i + 1}`
            })));
        }
        const tweets = merge(
            createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
            createTweetSource(3000, 'iamdevloper', 'Expert'),
            createTweetSource(5000, 'CommitStrip', 'Funny')
        );
        tweets.subscribe(console.log.bind(console));
        this.subscription = tweets.subscribe(tweet => {
            if (JSON.stringify(tweet)) {
                this.setState({
                    originalTweets: [...this.state.originalTweets.filter(i =>
                        (Date.now() - JSON.parse(i).timestamp) <= 30000), JSON.stringify(tweet)]
                });
            }
            else this.setState({ originalTweets: [] });
        })
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (JSON.parse(a)[property] < JSON.parse(b)[property]) ? -1 : (JSON.parse(a)[property] > JSON.parse(b)[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    clearList = () => {
        this.setState({ originalTweets: [] })
    };


    render() {
        return (
            <div>
                <br></br>
                <Button variant="contained" color="secondary" onClick={this.clearList}>
                    Clear Tweets
              </Button>
                {
                    <LikeList
                        list={(this.state.originalTweets).sort(this.dynamicSort("-timestamp"))}>
                    </LikeList>
                }
            </div>
        )
    }
}

export default TweetList;