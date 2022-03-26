// export default App;

import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import SingleCard from './components/SingleCard';

const cardList = [
  {alphabet: 'A', isMatched: false},
  {alphabet: 'B', isMatched: false},
  {alphabet: 'C', isMatched: false},
  {alphabet: 'D', isMatched: false},
  {alphabet: 'E', isMatched: false},
  {alphabet: 'F', isMatched: false},
  {alphabet: 'G', isMatched: false},
  {alphabet: 'H', isMatched: false},
];

const App = () => {
  // Required useStates
  const [cards, setCards] = useState([]);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [matches, setMatches] = useState(0);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Setting cards when it loads first time
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.alphabet === choiseTwo.alphabet) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.alphabet === choiseOne.alphabet) {
              return {...card, isMatched: true};
            } else {
              return card;
            }
          });
        });
        setTimeout(() => {
          setMatches(prevValue => prevValue + 1);
          resetTurns();
        }, 1000);
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  const resetTurns = () => {
    setTurns(prevValue => prevValue + 1);
    setChoiseOne(null);
    setChoiseTwo(null);
    setDisabled(false);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardList, ...cardList]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));
    setCards(shuffledCards);
    setTurns(0);
    setMatches(0);
  };

  const handleChoice = card => {
    choiseOne
      ? choiseOne.id !== card.id
        ? setChoiseTwo(card)
        : null
      : setChoiseOne(card);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
      }}>
      <View style={{marginBottom: 50, alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 32, fontWeight: '700'}}>
          Magic Game
        </Text>
        <TouchableOpacity
          onPress={() => {
            shuffleCards();
          }}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'grey',
            alignItems: 'center',
            borderRadius: 2.5,
            marginTop: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
            New Game
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: '900', color: 'black'}}>
            Matches :
          </Text>
          <Text style={{fontSize: 16, fontWeight: '900', color: 'black'}}>
            {matches}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: '900', color: 'black'}}>
            Turns :{' '}
          </Text>
          <Text style={{fontSize: 16, fontWeight: '900', color: 'black'}}>
            {turns}
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          style={{marginTop: 10}}
          data={cards}
          renderItem={({item}) => (
            <>
              <SingleCard
                item={item}
                handleChoice={handleChoice}
                flipped={
                  item === choiseOne || item === choiseTwo || item.isMatched
                }
                disabled={disabled}
              />
            </>
          )}
          numColumns={4}
        />
      </View>
    </View>
  );
};

export default App;
