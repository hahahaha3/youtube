import styles from './search_header.module.css';
import React, { memo, useRef } from 'react';

const SearchHeader = memo (
    ({onSearch}) => {
        // const handleSearch 검색을 처리할 수 있는 콜백함수를 만들건데,, 함수는 인자를 받지 않아도 되고 우리가 원하는 것을 input에 입력된 것에 값을 알아와야하자나? 그때 ref를 쓰는거야
        // useRef() 를 써야 계속 메모가 되겠지..?
        const inputRef = useRef();
    
        const handleSearch = () => {
            const value = inputRef.current.value;
            onSearch(value);
        };
    
        const onClick = () => {
            handleSearch();
        };
    
        const onKeyPress = (event) => {
            if(event.key === 'Enter') {
                handleSearch();
            }
        };
    
            return (
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <img className={styles.img} src="/images/logo.png" alt="logo" />
                        <h1  className={styles.title}>YOUTUBE</h1>
                    </div>
                    <input ref={inputRef} className={styles.input} type="search" placeholder='Search...' onKeyPress={onKeyPress} />
                    <button className={styles.button} type="submit" onClick={onClick}>
                        <img className={styles.buttonImg} src="/images/search.png" alt="search" />
                    </button>
                </header>
            );
        }
);

export default SearchHeader;