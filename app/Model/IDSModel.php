<?php
/**
 * Created by PhpStorm.
 * User: chen3
 * Date: 8/10/15
 * Time: 10:32 AM
 */

namespace App\Model;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Rhumsaa\Uuid\Uuid;

class IDSModel extends Model
{

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

//    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
//    protected $dates = ['deleted_at'];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        /**
         * Attach to the 'creating' Model Event to provide a UUID
         * for the `id` field (provided by $model->getKeyName())
         */
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string)$model->generateNewId();
        });
    }

    /**
     * Get a new version 4 (random) UUID.
     *
     * @return \Rhumsaa\Uuid\Uuid
     */
    public function generateNewId()
    {
        return Uuid::uuid4();
    }

}