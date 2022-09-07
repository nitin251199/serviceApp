import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {services} from '../../utils/testConstants';
import {Searchbar, useTheme} from 'react-native-paper';
import EmployeeCard from '../EmployeeCard';
import {Dimension} from '../../theme';

export default function SearchProvider(props) {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [serviceList, setServiceList] = React.useState(services);
  const [loading, setLoading] = React.useState(false);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setLoading(true);
    if (query !== '') {
      setTimeout(() => {
        const filteredData = services.filter(item => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        setServiceList(filteredData);
        setLoading(false);
      }, 1000);
    } else {
      setServiceList(services);
      setLoading(false);
    }
  };

  const emptyComponent = () => {
    return (
      !loading && (
        <View style={styles.emptyContainer}>
          <Text style={{...styles.emptyText, color: theme.colors.text}}>
            No results found
          </Text>
        </View>
      )
    );
  };

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Search by Provider"
        inputStyle={styles.inputStyle}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {searchQuery.length > 0 && (
        <FlatList
          data={serviceList}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => index}
          refreshing={loading}
          maxHeight={Dimension.window.height * 0.5}
          ListEmptyComponent={emptyComponent}
          onRefresh={() => true}
          renderItem={({item}) => (
            <EmployeeCard
              employee={item}
              onPress={() => props.navigation.navigate('Details', {item})}
            />
          )}
          style={{
            ...styles.searchList,
            backgroundColor: theme.colors.background,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    borderRadius: 0,
    // textAlign: 'center',
    padding: 0,
  },
  searchList: {
    padding: 10,
  },
  searchContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
    elevation: 5,
  },
  emptyContainer: {
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
