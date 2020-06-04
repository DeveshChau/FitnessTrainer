import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
    exerciseChanged: Subject<Exercise> = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        { id: 'crunche', name: 'crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 15 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    exercises: Exercise[] = [];

    getAvailableExercise(): Exercise[] {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelEsercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.duration * (progress / 100),
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return ({ ...this.runningExercise });
    }
}
