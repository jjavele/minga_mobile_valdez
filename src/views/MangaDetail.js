import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import mangaActions from "../redux/actions/manga";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MangaDetail = (props) => {
  const route = useRoute()
    //const { mangaId } = route.params;
    console.log(props)
    //const { id, page } = useParams();
    const manga = useSelector((store) => store.manga.manga);
    const chapters = useSelector((store) => store.manga.chapters);
    //console.log(chapters);
    const dispatch = useDispatch();
    let currentPage = 1

    const getStoredUserInfo = async () => {
        try {
          // Obtener el token almacenado en AsyncStorage.
          const tokenJSON = await AsyncStorage.getItem('token');
          const token = JSON.parse(tokenJSON); // Parsear la cadena JSON a un objeto JavaScript.
      
          // Hacer algo con el token y el objeto de usuario.
          //console.log('Token:', token);
          
          // Devolver el token y el objeto de usuario para usarlos en otras partes de tu aplicación.
          return token;
        } catch (error) {
          console.log(error.message);
          // Manejar el error apropiadamente, si es necesario.
          return null;
        }
      };
      
      let getManga = async () => {
        
        let token = await getStoredUserInfo()
        console.log(token)
        let headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`https://mingabackblueteam-production.up.railway.app/api/mangas/${props.route.params.mangaId}`, headers)
          .then((res) => dispatch(mangaActions.datos_manga(res.data.manga)))
          .catch((err) => console.error(err.response.data));
      }
  
    useEffect(() => {
      getManga();
    }, [props.route.params.mangaId]);
    /*
    useEffect(() => {
      axios
        .get(
          `https://mingabackblueteam-production.up.railway.app/api/chapters/?manga_id=${id}&page=${currentPage}`,
          headers
        )
        .then((res) => dispatch(mangaActions.chapters_manga(res.data)))
        .catch((err) => console.error(err));
    }, []);
  */
 console.log(manga)
    let [active, setActive] = useState(false);
  
    let [isModalOpen, setModalOpen] = useState(false)
    let [selectedChapterId, setSelectedChapterId] = useState(null)
  
    let handleOpenModal = (chapterId) => {
      setModalOpen(true);
      setSelectedChapterId(chapterId);
    }
  
    let handleCloseModal = () => {
      setModalOpen(false);
    }

    if (!manga) {
      return (
        <Text>Loading</Text>
      )
    }

    return (
        <View style={styles.container}>
          <ScrollView >
            <Image source={{ uri: manga.cover_photo }} style={styles.mangaCover} />
            {/*activeTab === 'mangas' && */
            (
            <View>
              <Text style={styles.mangaTitle}>{manga.title}</Text>
              <View style={styles.mangaDetails}>
                <View style={styles.categoryText}>
                    <Text>{manga.category_id?.name}</Text>
                </View>
                <View style={styles.authorText}>
                    <Text>{manga.author_id.name}</Text>
                </View>
              </View>
              <View style={styles.containerReaction}>
                <TouchableOpacity style={styles.button}><Text style={styles.reaction}>👍</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.reaction}>👎️</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.reaction}>😮</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.reaction}>😍</Text></TouchableOpacity>
              </View>
              <View style={styles.containerInfo}>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.ratingText}>4.5/5</Text>
                        <Text style={styles.secondaryText}>Rating</Text>
                    </View>
                    <Text style={styles.separator}>|</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.ratingText}>265</Text>
                        <Text style={styles.secondaryText}>Chapters</Text>
                    </View>
                    <Text style={styles.separator}>|</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.ratingText}>Eng</Text>
                        <Text style={styles.secondaryText}>Language</Text>
                    </View>
                </View>
              </View>
              <View style={styles.tabContainer}>
                {/*<TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'mangas' ? '#4338CA' : '#9D9D9D', elevation: activeTab === 'mangas' ? 20 : 0, width: activeTab === 'mangas' ? '60%' : '60%', marginLeft: activeTab === 'mangas' ? '-5%' : '20%', marginRight: activeTab === 'mangas' ? '-5%' : '20%', zIndex: activeTab === 'mangas' ? 1 : 0 }]} onPress={switchToMangaTab}>
                  <Text style={[styles.tabButtonText, { color: activeTab === 'mangas' ? 'white' : 'black' }]}>Manga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'chapters' ? '#4338CA' : '#9D9D9D', elevation: activeTab === 'chapters' ? 10 : 0, width: activeTab === 'chapters' ? '60%' : '60%', marginLeft: activeTab === 'chapters' ? '-5%' : '20%', marginRight: activeTab === 'chapters' ? '-5%' : '10%', zIndex: activeTab === 'chapters' ? 1 : 0 }]} onPress={switchToChaptersTab}>
                  <Text style={[styles.tabButtonText, { color: activeTab === 'chapters' ? 'white' : 'black' }]}>Chapters</Text>
            </TouchableOpacity>*/}
              </View>
              <Text style={styles.mangaDescription}>{manga.description}</Text>
            </View>
          )}
          {/*activeTab === 'chapters' && (
            <View>
                <ScrollView>
                  <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'mangas' ? '#4338CA' : '#9D9D9D', elevation: activeTab === 'mangas' ? 20 : 0, width: activeTab === 'mangas' ? '60%' : '60%', marginLeft: activeTab === 'mangas' ? '-5%' : '20%', marginRight: activeTab === 'mangas' ? '-5%' : '10%', zIndex: activeTab === 'mangas' ? 1 : 0 }]} onPress={switchToMangaTab}>
                      <Text style={[styles.tabButtonText, { color: activeTab === 'mangas' ? 'white' : 'black' }]}>Manga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'chapters' ? '#4338CA' : '#9D9D9D', elevation: activeTab === 'chapters' ? 10 : 0, width: activeTab === 'chapters' ? '60%' : '60%', marginLeft: activeTab === 'chapters' ? '-5%' : '20%', marginRight: activeTab === 'chapters' ? '-5%' : '18%', zIndex: activeTab === 'chapters' ? 1 : 0 }]} onPress={switchToChaptersTab}>
                      <Text style={[styles.tabButtonText, { color: activeTab === 'chapters' ? 'white' : 'black' }]}>Chapters</Text>
                    </TouchableOpacity>
                  </View>
                    {chapters.map((chapter) => (
                        <ChapterCaps key={chapter._id} chapter={chapter}/>
                    ))}
                </ScrollView>
              <View style={styles.paginationContainer}>
                <TouchableOpacity style={[styles.paginationButton, { backgroundColor: prev ? '#4338CA' : '#9D9D9D' }]} onPress={handlePrevPage}>
                  <Text style={styles.paginationButtonText}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.paginationButton, { backgroundColor: next ? '#4338CA' : '#9D9D9D' }]} onPress={handleNextPage}>
                  <Text style={styles.paginationButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
                    )*/}
          </ScrollView>
        </View>
      );
    };
    
    export default MangaDetail;
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#EBEBEB',
        },
        mangaCover: {
          borderRadius: 10,
          width: '90%',
          height: 300,
          resizeMode: 'cover',
          marginTop: 20,
          alignSelf: 'center',
        },
        mangaTitle: {
          margin: 20,
          fontSize: 24,
          fontWeight: '400',
          textAlign: 'center',
        },
        mangaDetails: {
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        categoryText: {
          borderRadius: 50,
          padding: 15,
          backgroundColor: '#FFE0DF',
          fontSize: 20,
          fontWeight: 400,
        },
        authorText: {
          padding: 15,
          fontSize: 25,
          fontWeight: 400,
        },
        mangaDescription: {
          marginBottom: 25,
          fontSize: 18,
          width: '80%',
          alignSelf: 'center'
        },
        tabContainer: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 40,
          position: 'relative'
        },
        tabButton: {
          flex: 1,
          padding: 10,
          alignItems: 'center',
          borderRadius: 20,
          position: 'absolute'
        },
        tabButtonText: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        paginationContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        },
        paginationButton: {
          padding: 10,
          marginHorizontal: 5,
          backgroundColor: '#4338CA',
          borderRadius: 20,
        },
        paginationButtonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
        containerReaction: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: 16,
            marginTop: 50
          },
          button: {
            backgroundColor: 'white',
            borderRadius: 100,
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          },
          reaction: {
            fontSize: 35,
          },
          containerInfo: {
            width: '90%',
            height: 80,
            backgroundColor: 'white',
            borderRadius: 20,
            elevation: 4,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center'
          },
          infoContainer: {
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'center',
          },
          textContainer: {
            alignItems: 'center',
          },
          ratingText: {
            color: '#424242',
            fontSize: 22,
            fontWeight: 'normal',
            marginLeft: 40,
            marginRight: 40
          },
          secondaryText: {
            color: '#9D9D9D',
            fontSize: 14,
            fontWeight: 'normal',
          },
          separator: {
            color: '#9D9D9D',
            fontSize: 20,
            fontWeight: '400',
          },
      });