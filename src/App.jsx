import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//___Components___//
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import ReagentList from './components/ReagentList/ReagentList';
import ReagentDetails from './components/ReagentDetails/ReagentDetails';
import ReagentForm from './components/ReagentForm/ReagentForm';
import CommentForm from './components/CommentForm/CommentForm';
import EquipmentList from './components/EquipmentList/EquipmentList';
import EquipmentForm from './components/EquipmentForm/EquipmentForm';
import EquipmentDetails from './components/EquipmentDetails/EquipmentDetails';

//___Services___//
import * as authService from '../src/services/authService';
import * as reagentService from '../src/services/reagentService';
import * as equipmentService from '../src/services/equipmentService';

import './App.css';

export const AuthedUserContext = createContext(null);

const App = () => {

  const [user, setUser] = useState(authService.getUser());
  const [reagents, setReagents] = useState([]);
  const [equipments, setEquipments] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllReagents = async () => {
      const reagentsData = await reagentService.index();
      setReagents(reagentsData);
    };
    if (user) fetchAllReagents();
  }, [user]);

  useEffect(() => {
    const fetchAllEquipments = async () => {
      const equipmentsData = await equipmentService.index();
      setEquipments(equipmentsData);
    };
    if (user) fetchAllEquipments();
  }, [user]);

  //___Reagent Handlers___//
  const handleAddReagent = async (reagentFormData) => {
    const newReagent = await reagentService.create(reagentFormData);
    setReagents([newReagent, ...reagents]);
    navigate('/reagents');
  };
  const handleDeleteReagent = async (reagentId) => {
    const deletedReagent = await reagentService.deleteReagent(reagentId);
    setReagents(reagents.filter((reagent) => reagent._id !== deletedReagent._id));
    navigate('/reagents');
  };
  const handleUpdateReagent = async (reagentId, reagentFormData) => {
    const updatedReagent = await reagentService.updateReagent(reagentId, reagentFormData);
    setReagents(reagents.map((reagent) => (reagentId === reagent._id ? updatedReagent : reagent)));
    navigate(`/reagents/${reagentId}`);
  };

  //___Equipment Handlers___//
  const handleAddEquipment = async (equipmentFormData) => {
    const newEquipments = await equipmentService.create(equipmentFormData);
    setEquipments([newEquipments, ...equipments]);
    navigate('/equipments');
  };
  const handleDeleteEquipment = async (equipmentId) => {
    const deletedEquipments = await equipmentService.deleteEquipment(equipmentId);
    setEquipments(equipments.filter((equipment) => equipment._id !== deletedEquipments._id));
    navigate('/equipments');
  };
  const handleUpdateEquipment = async (equipmentId, equipmentFormData) => {
    const updatedEquipments = await equipmentService.updateEquipment(equipmentId, equipmentFormData);
    setEquipments(equipments.map((equipment) => (equipmentId === equipment._id ? updatedEquipments : equipment)));
    navigate(`/equipments/${equipmentId}`);
  };


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/reagents" element={<ReagentList reagents={reagents} />} />
              <Route path="/reagents/new" element={<ReagentForm handleAddReagent={handleAddReagent} />} />
              <Route
                path="/reagents/:reagentId"
                element={<ReagentDetails handleDeleteReagent={handleDeleteReagent} />}
              />
              <Route
                path="/reagents/:reagentId/edit"
                element={<ReagentForm handleUpdateReagent={handleUpdateReagent} />}
              />
              <Route
                path="/reagents/:reagentId/comments/:commentId/edit"
                element={<CommentForm />}
              />
              <Route path="/equipments" element={<EquipmentList equipments={equipments} />} />
              <Route path="/equipments/new" element={<EquipmentForm handleAddEquipment={handleAddEquipment} />} />
              <Route
                path="/equipments/:equipmentId"
                element={<EquipmentDetails handleDeleteEquipment={handleDeleteEquipment} />}
              />
              <Route
                path="/equipments/:equipmentId/edit"
                element={<EquipmentForm handleUpdateEquipment={handleUpdateEquipment} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path="/*" element={<><h1>Nothing here</h1></>} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
