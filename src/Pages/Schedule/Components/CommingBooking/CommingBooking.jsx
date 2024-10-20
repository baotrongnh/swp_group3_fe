import { useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import './CommingBooking.scss';

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return (
        <div className='data-form'>
            <Flex align='center' gap='small'>
                <Icon icon="ion:calendar-outline" style={{ fontSize: '1.6rem' }} />
                <p className='data-date'>{`${year}-${month}-${day}`}</p>
            </Flex>
            <Flex align='center' gap='small'>
                <Icon icon="mingcute:time-line" style={{ fontSize: '1.6rem' }} />
                <p className='data-time'>{`${hours}:${minutes}:${seconds}`}</p>
            </Flex>
        </div>
    );
};

const CommingBooking = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                const updatedData = body.results.map(item => ({
                    ...item,
                    time: formatDate(new Date())
                }));
                setData([...data, ...updatedData]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            className='comming-booking'
            id="scrollableDiv"
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.email} className="list-item">
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} size={70} />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                            <div className="time-wrapper">{item.time}</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

export default CommingBooking;