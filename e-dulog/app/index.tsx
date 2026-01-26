import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { Image } from "expo-image";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const fullText = "Mabilis na Sumbong, Agarang Aksyon.";

  // Typewriter effect with loop
  useEffect(() => {
    let timeout;

    if (!isDeleting && currentIndex < fullText.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
    } else if (!isDeleting && currentIndex === fullText.length) {
      // Pause at the end before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, 50);
    } else if (isDeleting && currentIndex === 0) {
      // Pause at the beginning before typing again
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  // Cursor blinking animation
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blinkAnimation.start();

    return () => blinkAnimation.stop();
  }, []);

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#f0f8ff', '#e6f0fa']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* 🔹 Top logos container */}
        <View style={styles.topLogosContainer}>
          <Image
            source={require("@/assets/images/pglu logo.png")}
            style={styles.pgluLogo}
          />
          <Image
            source={require("@/assets/images/bp logo.png")}
            style={styles.topLogo}
          />
        </View>

        {/* 🔹 Main eTugon Logo */}
        <Image
          source={require("@/assets/images/Logo.png")}
          style={styles.logo}
        />

        {/* 🔹 Title with colored text */}
        <Text style={styles.title}>
          <Text style={styles.blue}>e</Text>
          <Text style={styles.red}>Tugon</Text>
        </Text>

        {/* 🔹 Tagline with typewriter effect and cursor */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            {displayText}
            <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]}>|</Animated.Text>
          </Text>
        </View>

        {/* 🔹 Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.buttonText}>Mag-report ng Isyu</Text>
          <FontAwesome name="arrow-right" size={16} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  topLogosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 60, // Adjust this value based on your status bar height
  },
  pgluLogo: {
    width: 50,
    height: 50,
    marginRight: 8,
    resizeMode: 'contain',
  },
  topLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  blue: {
    color: "#004a89",
    fontStyle: "italic",
    textShadowColor: 'rgba(0, 74, 137, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  red: {
    color: "#e63946",
    fontStyle: "italic",
    textShadowColor: 'rgba(230, 57, 70, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  taglineContainer: {
    marginBottom: 30,
    minHeight: 25,
  },
  tagline: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  cursor: {
    fontSize: 18,
    color: "#004a89",
    fontWeight: "500",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#004a89",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: "#004a89",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});