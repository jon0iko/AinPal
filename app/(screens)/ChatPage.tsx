import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { fetchChat } from "@/api/chat";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { sender: "user", text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      await fetchChat(inputText, (chunk: string) => {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];

          if (lastMessage?.sender === "bot") {
            // Append to the last bot message
            return [
              ...prevMessages.slice(0, -1),
              { sender: "bot", text: lastMessage.text + chunk },
            ];
          } else {
            // Add a new bot message
            return [...prevMessages, { sender: "bot", text: chunk }];
          }
        });
      });
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            {item.text}
          </Text>
        )}
        contentContainerStyle={styles.messageContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
        />
        <Button
          title={isLoading ? "Loading..." : "Send"}
          onPress={handleSend}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
    color: "#fff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#fff",
  },
});

export default ChatPage;
