import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, Button,Icon } from 'react-native-elements';

const Shop = ({ image_url, name }) =>
    <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: image_url }} />
        <Text style={{ marginBottom: 10 }}>
            {name}
        </Text>
        <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={styles.container}
            title="VIEW NOW"
        />
    </Card>

export default memo(Shop);

const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
});