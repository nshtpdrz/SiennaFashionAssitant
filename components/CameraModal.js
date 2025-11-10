// components/CameraModal.js
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function CameraModal({ visible, onClose, onPhotoTaken }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  // Solicitar permisos al abrir el modal
  useEffect(() => {
    if (visible) {
      requestPermission();
    }
  }, [visible]);

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Solicitando permisos...</Text>
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.permissionTitle}>Permiso de Cámara</Text>
          <Text style={styles.permissionText}>
            Necesitamos acceso a tu cámara para tomar fotos de tus prendas
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Conceder Permiso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          exif: true
        });
        
        onPhotoTaken(photo.uri);
        onClose();
      } catch (error) {
        Alert.alert('Error', 'No se pudo tomar la foto: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const pickFromGallery = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled) {
        onPhotoTaken(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingOverlayText}>Procesando imagen...</Text>
          </View>
        )}
        
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mode="picture"
        >
          <View style={styles.overlay}>
            {/* Guía para tomar fotos de prendas */}
            <View style={styles.guideFrame}>
              <View style={styles.guideTextContainer}>
                <Text style={styles.guideText}>Encuadra tu prenda aquí</Text>
              </View>
            </View>

            {/* Controles superiores */}
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.flipBtn} 
                onPress={() => setFacing(current => current === 'back' ? 'front' : 'back')}
              >
                <Text style={styles.flipBtnText}>🔄</Text>
              </TouchableOpacity>
            </View>

            {/* Controles inferiores */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
                <Text style={styles.galleryBtnText}>📁 Galería</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.captureBtn} 
                onPress={takePicture}
                disabled={loading}
              >
                <View style={styles.captureBtnInner} />
              </TouchableOpacity>
              
              <View style={styles.placeholder} />
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  // Guía de encuadre
  guideFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Controles superiores
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  closeBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flipBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  // Controles inferiores
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  galleryBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  galleryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  captureBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureBtnInner: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholder: {
    width: 80,
  },
  // Estados de carga y permisos
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingOverlayText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});