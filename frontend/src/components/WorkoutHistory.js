import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([
    { id: 1, date: '2024-11-01', time: '09:00', type: 'Running', duration: 30 },
    { id: 2, date: '2024-11-03', time: '16:00', type: 'Weightlifting', duration: 45 },
    { id: 3, date: '2024-11-05', time: '07:30', type: 'Swimming', duration: 40 },
  ])
  const [searchDate, setSearchDate] = useState('')
  const [editingWorkout, setEditingWorkout] = useState(null)

  const filteredWorkouts = workouts.filter(workout => 
    searchDate ? workout.date === searchDate : true
  ).sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime())

  const handleEdit = (workout) => {
    setEditingWorkout({ ...workout })
  }

  const handleSave = () => {
    if (editingWorkout) {
      setWorkouts(workouts.map(w => w.id === editingWorkout.id ? editingWorkout : w))
      setEditingWorkout(null)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      <div className="mb-4">
        <Input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Search by date"
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration (minutes)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWorkouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell>{workout.date}</TableCell>
              <TableCell>{workout.time}</TableCell>
              <TableCell>{workout.type}</TableCell>
              <TableCell>{workout.duration}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(workout)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Workout</DialogTitle>
                    </DialogHeader>
                    {editingWorkout && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                          <Input
                            type="date"
                            id="date"
                            value={editingWorkout.date}
                            onChange={(e) => setEditingWorkout({ ...editingWorkout, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                          <Input
                            type="time"
                            id="time"
                            value={editingWorkout.time}
                            onChange={(e) => setEditingWorkout({ ...editingWorkout, time: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                          <Input
                            type="text"
                            id="type"
                            value={editingWorkout.type}
                            onChange={(e) => setEditingWorkout({ ...editingWorkout, type: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                          <Input
                            type="number"
                            id="duration"
                            value={editingWorkout.duration}
                            onChange={(e) => setEditingWorkout({ ...editingWorkout, duration: parseInt(e.target.value) })}
                          />
                        </div>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

