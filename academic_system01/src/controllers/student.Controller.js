import Student from '../models/student.js';

// Obtener todos los estudiantes
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiantes', error: error.message });
  }
};

// Crear un nuevo estudiante
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creando estudiante', error: error.message });
  }
};

// Obtener estudiante por ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiante', error: error.message });
  }
};

// Actualizar estudiante
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar estudiante', error: error.message });
  }
};

// Eliminar estudiante
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar estudiante', error: error.message });
  }
};
