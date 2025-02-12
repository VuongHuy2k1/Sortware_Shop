// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import SliderButton from '../Slider/SliderButton';
import { Link } from 'react-router-dom';

import * as categoryServices from 'src/services/categoryServices';

import styles from './BrowseTag.module.scss';
const cx = classNames.bind(styles);
export default function BrowseByTag() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideValue, setSlideValue] = useState([]);

  const [sliceSlideValue, setSilceSlideValue] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setSlideValue(result || []);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const chunkArray = (myArray, chunk_size) => {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      console.log(slideValue);
      for (index = 0; index < arrayLength; index += chunk_size) {
        var myChunk = myArray.slice(index, index + chunk_size);
        if (myChunk.length === 5) {
          tempArray.push(myChunk);
        }
      }

      return tempArray;
    };
    var sliceValue = chunkArray(slideValue, 5);
    setSilceSlideValue(sliceValue);
  }, [slideValue]);

  const nextSlide = () => {
    if (slideIndex !== sliceSlideValue.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === sliceSlideValue.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(sliceSlideValue.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  var myArray = [
    process.env.PUBLIC_URL + '/images/vr.png',
    process.env.PUBLIC_URL + '/images/multiplayer.png',
    process.env.PUBLIC_URL + '/images/anime.png',
    process.env.PUBLIC_URL + '/images/action.png',
    process.env.PUBLIC_URL + '/images/racing.png',
    process.env.PUBLIC_URL + '/images/anime.png',
    process.env.PUBLIC_URL + '/images/vr.png',
    process.env.PUBLIC_URL + '/images/multiplayer.png',
    process.env.PUBLIC_URL + '/images/anime.png',
    process.env.PUBLIC_URL + '/images/action.png',
    process.env.PUBLIC_URL + '/images/racing.png',
    process.env.PUBLIC_URL + '/images/anime.png',
  ];

  var myArrayColor = [
    'linear-gradient(rgba(0,0,0,0), rgb(184,134,11) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,100,0) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,139,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(139,0,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,0,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(184,134,11) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,139,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(139,0,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,0,139) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(184,134,11) 100%',
    'linear-gradient(rgba(0,0,0,0), rgb(0,100,0) 100%',
  ];

  return (
    <div className={cx('container')}>
      <div className={cx('container-content')}>
        <h1>Duyệt theo thể loại</h1>
      </div>

      <div className={cx('container-slider')}>
        {sliceSlideValue.map((items, indexx) => {
          if (items?.length === 5) {
            return (
              <div className={slideIndex === indexx + 1 ? cx('slide') : cx('active-anim')} key={indexx}>
                {items?.map((item, index) => {
                  return (
                    <Link to={`/category/${item.id}`} className={cx('detail-link')}>
                      <div className={cx('product')}>
                        <img src={myArray[(index + 1) * (indexx + 1)]} alt=""></img>

                        <div
                          className={cx('product-detai')}
                          style={{ background: myArrayColor[(index + 1) * (indexx + 1)] }}
                        >
                          <div className={cx('detail-wrapper')}>
                            <div className={cx('detail-content')}>{item?.name}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          }
        })}

        <SliderButton moveSlide={nextSlide} direction={'next'} />
        <SliderButton moveSlide={prevSlide} direction={'prev'} />
      </div>
      <div className={cx('container-dots')}>
        {Array.from({ length: sliceSlideValue.length }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? cx('dot', 'active') : cx('dot')}
          ></div>
        ))}
      </div>
    </div>
  );
}
