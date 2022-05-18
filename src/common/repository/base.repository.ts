import { Document, Model, Query, QueryOptions } from 'mongoose'
import { QueryOption, QueryPostOption } from '../tools/request.tool'

export class BaseRepository<T extends Document> {
  /**
   * Construct service base model
   * @param baseModel Mongoose model
   */
  private submodels: { [name: string]: Model<any> } = {}

  constructor(private baseModel: Model<T>, submodels: Array<Model<any>> = []) {
    if (baseModel) {
      this.submodels[baseModel.name] = baseModel
    }
    submodels.forEach((submodel) => {
      this.submodels[submodel.modelName] = submodel
    })
  }

  getModel(): Model<T>
  getModel<V extends Document>(name: string): Model<V>
  getModel<V extends Document>(name?: string): Model<V> | Model<T> {
    if (!name) {
      return this.baseModel
    } else {
      const submodel = this.submodels[name]
      if (submodel === undefined) {
        throw new Error('Submodel not found')
      }
      return submodel
    }
  }

  count({
    conditions,
    submodelName,
  }: { conditions?: any; submodelName?: string } = {}): Promise<number> {
    const model = this.getModel(submodelName)
    return Object.keys(conditions || {}).length > 0
      ? model.countDocuments(conditions).exec()
      : model.estimatedDocumentCount().exec()
  }

  getMany(query: QueryPostOption): Query<T[], T>
  getMany<V extends Document>(
    query: QueryPostOption,
    submodelName: string,
  ): Query<V[], V>
  getMany<V extends Document>(
    query: QueryPostOption,
    submodelName?: string,
  ): Query<V[], V> | Query<T[], T> {
    const model = this.getModel<V>(submodelName)
    return model.find(query.conditions).setOptions(query.options)
  }

  getAll(): Query<T[], T>
  getAll<V extends Document>(submodelName: string): Query<V[], V>
  getAll<V extends Document>(
    submodelName?: string,
  ): Query<V[], V> | Query<T[], T> {
    const model = this.getModel<V>(submodelName)
    return model.find({})
  }

  async getPagination(
    query: QueryPostOption,
  ): Promise<{ data: T[]; total: number }>
  async getPagination<V extends Document>(
    query: QueryPostOption,
    submodelName: string,
  ): Promise<{ data: V[]; total: number }>
  async getPagination<V extends Document>(
    query: QueryPostOption,
    submodelName?: string,
  ): Promise<{ data: V[] | T[]; total: number }> {
    const [data, total] = await Promise.all([
      this.getMany<V>(query, submodelName),
      this.count({ conditions: query.conditions, submodelName }),
    ])
    return {
      data,
      total,
    }
  }

  getOne(query: QueryPostOption): Query<T, T>
  getOne<V extends Document>(
    query: QueryPostOption,
    submodelName: string,
  ): Query<V, V>
  getOne<V extends Document>(
    query: QueryPostOption,
    submodelName?: string,
  ): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findOne(query.conditions).setOptions(query.options)
  }

  getById({ id, options }: { id: string; options?: QueryOption }): Query<T, T>
  getById<V extends Document>({
    id,
    options,
  }: {
    id: string
    options?: QueryOption
    submodelName: string
  }): Query<V[], V>
  getById<V extends Document>({
    id,
    options,
    submodelName,
  }: {
    id: string
    options?: QueryOption
    submodelName?: string
  }): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findById(id).setOptions(options)
  }

  create(docs: any): Promise<T>
  create<V extends Document>(docs: any, submodelName: string): Promise<V>
  create<V extends Document>(docs: any, submodelName?: string): Promise<V | T> {
    const model = this.getModel<V>(submodelName)
    return model.create(docs)
  }

  createMany(docs: any[]): Promise<T[]>
  createMany<V extends Document>(
    docs: any[],
    submodelName: string,
  ): Promise<V[]>
  createMany<V extends Document>(
    docs: any[],
    submodelName?: string,
  ): Promise<V[] | T[]> {
    const model = this.getModel<V>(submodelName)
    return model.insertMany(docs)
  }

  updateById({
    id,
    update,
    options,
  }: {
    id: string
    update: any
    options?: QueryOptions
  }): Query<T, T>
  updateById<V extends Document>({
    id,
    update,
    options,
    submodelName,
  }: {
    id: string
    update: any
    options?: QueryOptions
    submodelName: string
  }): Query<V, V> | Query<T, T>
  updateById<V extends Document>({
    id,
    update,
    options,
    submodelName,
  }: {
    id: string
    update: any
    options?: QueryOptions
    submodelName?: string
  }): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findByIdAndUpdate(id, update, options)
  }

  updateOne({
    conditions,
    update,
    options,
  }: {
    conditions: any
    update: any
    options?: QueryOptions
  }): Query<T, T>
  updateOne<V extends Document>({
    conditions,
    update,
    options,
    submodelName,
  }: {
    conditions: any
    update: any
    options?: QueryOption
    submodelName?: string
  }): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findOneAndUpdate(conditions, update, options)
  }

  deleteById(id: string, submodelName?: string): Query<T, T>
  deleteById<V extends Document>(id: string, submodelName: string): Query<V, V>
  deleteById<V extends Document>(
    id: string,
    submodelName?: string,
  ): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findByIdAndDelete(id)
  }

  deleteOne(conditions: any): Query<T, T>
  deleteOne<V extends Document>(
    conditions: any,
    submodelName: string,
  ): Query<V, V>
  deleteOne<V extends Document>(
    conditions: any,
    submodelName?: string,
  ): Query<V, V> | Query<T, T> {
    const model = this.getModel<V>(submodelName)
    return model.findOneAndDelete(conditions)
  }
}
