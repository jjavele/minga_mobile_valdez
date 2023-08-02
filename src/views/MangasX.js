import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { setFilters, setCategories, setMangas, setPagination } from '../redux/actions/mangas.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import inputActions from "../redux/actions/mangas.js";

export default function Mangas() {
  const store = useStore();
  const dispatch = useDispatch();
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [title, setTitle] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const checks = useSelector((state) => state.check.checks);
  const text = useSelector((state) => state.check.text);

  const dispatchFilters = (check) => {
    let payload = [];
    if (!checks.includes(check)) {
      payload = [...checks, check];
      dispatch(inputActions.changeChecks([...checks, check]));
    } else {
      payload = checks.filter((category) => category !== check);
    }
    dispatch(inputActions.changeChecks(payload));
  };

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getMangas = async () => {
    try {
      let { data } = await api.get(
        apiUrl +
          endpoints.read_mangas +
          `?title=${text}&category_id=${checks}&page=${page}`
      );
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      let { data } = await api.get(apiUrl + endpoints.read_categories);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilters = () => {
    setCategoriesSelected([]);
    dispatch(inputActions.changeChecks([]));
  };

  console.log(mangas);

  const PrevButton = (props) => {
    const { page } = props;
    if (page !== 1) {
      return (
        <button
          {...props}
          className="self-center text-white font-bold text-lg hover:scale-[1.1]"
        >
          <strong>{"<<<"}</strong>
        </button>
      );
    } else {
      return (
        <button
          {...props}
          className="self-center text-gray-400 font-bold text-lg hover:scale-[1.1]"
          disabled
        >
          <strong>{"<<<"}</strong>
        </button>
      );
    }
  };

  const NextButton = (props) => {
    const { page, totalPages } = props;
    if (page !== totalPages) {
      return (
        <button
          {...props}
          className="self-center text-white font-bold text-lg hover:scale-[1.1]"
        >
          <strong>{">>>"}</strong>
        </button>
      );
    } else {
      return (
        <button
          {...props}
          className="self-center text-gray-400 font-bold text-lg hover:scale-[1.1]"
          disabled
        >
          <strong> {">>>"}</strong>
        </button>
      );
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getMangas();
    getCategories();
  }, [text, checks, page]);;

  return (
    <View>
        <ScrollView>
        <ImageBackground source={require('../../assets/background-mangas.png')} style={styles.imageBackground} >
          <NavBar />
          <Text style={styles.title}>Mangas</Text>
          <View style={styles.searchContainer}>
            <TextInput value={title} onChangeText={handleTextChange} style={styles.searchInput} placeholder="Find your manga here"/>
          </View>
        </ImageBackground>
        <View style={styles.containerAll}>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity key={category._id} onPress={() => selectCategory(category._id)} style={[styles.categoryButton, { backgroundColor: categoriesSelected.includes(category._id) ? category.hover : category.color }, categoriesSelected.includes(category._id) && styles.selectedCategoryButton]} >
                <Text style={styles.categoryButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mangaContainer}>
            {mangas.length > 0 ? (mangas.map((manga, index) => (
                <TouchableOpacity key={manga._id} style={[ styles.mangaCard, { borderColor: borderColor(index) }]} onPress={() => navigation.navigate('MangaDetails', { mangaId: manga._id })}>
                  <Text style={styles.mangaTitle}>{manga.title}</Text>
                  <Image source={{ uri: manga.cover_photo }} style={styles.mangaImage} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noMangasText}>No sleeves were found matching the selected filters.</Text>
            )}
          </View>
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePrevPage} disabled={!prev} style={[styles.paginationButton, !prev && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextPage} disabled={!next} style={[styles.paginationButton, !next && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 350
  },
  searchContainer: {
    marginBottom: 50,
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 45,
    color: 'white'
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%'
  },
  containerAll: {
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    marginTop: -80
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 40
  },
  selectedCategoryButton: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mangaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  mangaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    height: 180,
    elevation: 6
  },
  mangaTitle: {
    width: 130,
    fontSize: 18,
    paddingStart: 25,
    paddingEnd: 10
  },
  mangaImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  noMangasText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#FF97DB',
  },
  disabledButton: {
    backgroundColor: '#B8B8B8',
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});